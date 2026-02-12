import json
import os
import subprocess
import tarfile
import tempfile
import sys
from pathlib import Path

def verify_package(package_path):
    package_name = package_path.name
    print(f"Checking {package_name}...")
    
    with tempfile.TemporaryDirectory() as tmpdir:
        # Run pnpm pack
        try:
            result = subprocess.run(
                ["pnpm", "pack", "--pack-destination", tmpdir],
                cwd=package_path,
                capture_output=True,
                text=True,
                check=True
            )
        except subprocess.CalledProcessError as e:
            print(f"Error packing {package_name}: {e.stderr}")
            return False
            
        # Find the tarball
        tarball = list(Path(tmpdir).glob("*.tgz"))[0]
        
        # Extract package.json
        with tarfile.open(tarball, "r:gz") as tar:
            try:
                member = tar.getmember("package/package.json")
                f = tar.extractfile(member)
                if f:
                    content = json.load(f)
                    
                    # Check dependencies
                    deps_to_check = ['dependencies', 'devDependencies', 'peerDependencies']
                    for dep_type in deps_to_check:
                        if dep_type in content:
                            for name, version in content[dep_type].items():
                                if "workspace:" in str(version):
                                    print(f"❌ FAILURE: {package_name} has unresolved workspace dependency in {dep_type}: {name} -> {version}")
                                    return False
            except KeyError:
                print(f"❌ FAILURE: Could not find package/package.json in tarball for {package_name}")
                return False
                
    print(f"✅ {package_name} is valid.")
    return True

def main():
    root_dir = Path(__file__).parent.parent
    packages_dir = root_dir / "packages"
    
    # Skip _boilerplate and storybook-demo if they are not intended for publishing as libraries
    # But for now, let's check everything that is NOT private: true
    
    failed = False
    package_count = 0
    
    for package_dir in packages_dir.iterdir():
        if package_dir.is_dir():
            package_json_path = package_dir / "package.json"
            if package_json_path.exists():
                with open(package_json_path, 'r') as f:
                    data = json.load(f)
                    if data.get('private') == True:
                        continue
                
                package_count += 1
                if not verify_package(package_dir):
                    failed = True
    
    if failed:
        print("\nVerification FAILED! Some packages have unresolved workspace dependencies.")
        sys.exit(1)
    else:
        print(f"\nVerification SUCCESS! All {package_count} packages are valid for publishing.")
        sys.exit(0)

if __name__ == "__main__":
    main()
