import os
import json

PACKAGES_DIR = 'packages'
PRIVATE_PACKAGES = ['demo-react-app', 'storybook-demo', '_boilerplate']
REPO_URL = 'git+https://github.com/fiveid/rendr-view.git'

def standardize_package_json(path, pkg_dir):
    with open(path, 'r') as f:
        data = json.load(f)

    is_private = data.get('private', False) or pkg_dir in PRIVATE_PACKAGES

    # 1. Basic Metadata
    data['license'] = 'MIT'
    data['engines'] = { "node": ">=22" }
    data['repository'] = {
        "type": "git",
        "url": REPO_URL,
        "directory": f"packages/{pkg_dir}"
    }
    
    # Remove clutter
    data.pop('gitHead', None)
    if 'scripts' in data:
        data['scripts'].pop('prepublish', None)

    # 2. Dependency Management (for libs)
    if not is_private:
        data['sideEffects'] = False
        data['publishConfig'] = { "access": "public" }
        
        # Move react/react-dom to peerDependencies
        deps = data.get('dependencies', {})
        peer_deps = data.get('peerDependencies', {})
        
        for pkg in ['react', 'react-dom']:
            if pkg in deps:
                version = deps.pop(pkg)
                # Ensure we use a compatible range, defaulting to ^19.0.0 for this project
                peer_deps[pkg] = "^19.0.0" 
        
        if peer_deps:
            data['peerDependencies'] = peer_deps
        if not deps:
            data.pop('dependencies', None)
        else:
            data['dependencies'] = deps

        # 3. Standardize Entry Points
        data['main'] = "./dist/index.js"
        data['module'] = "./dist/index.mjs"
        data['types'] = "./dist/index.d.ts"
        data['exports'] = {
            ".": {
                "types": "./dist/index.d.ts",
                "import": "./dist/index.mjs",
                "require": "./dist/index.js"
            }
        }
    else:
        # Ensure private status
        data['private'] = True
        data.pop('publishConfig', None)

    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
        f.write('\n')

def standardize_tsconfig(path):
    config = {
        "extends": "../../tsconfig.json",
        "compilerOptions": {
            "outDir": "./dist"
        },
        "include": ["src"]
    }
    
    # Check if tests exist to include them
    pkg_root = os.path.dirname(path)
    if os.path.exists(os.path.join(pkg_root, '__tests__')):
        config["include"].append("__tests__")
    
    with open(path, 'w') as f:
        json.dump(config, f, indent=2)
        f.write('\n')

def main():
    for pkg_dir in os.listdir(PACKAGES_DIR):
        full_path = os.path.join(PACKAGES_DIR, pkg_dir)
        if not os.path.isdir(full_path):
            continue
            
        pkg_json_path = os.path.join(full_path, 'package.json')
        if os.path.exists(pkg_json_path):
            print(f"Standardizing {pkg_dir}/package.json")
            standardize_package_json(pkg_json_path, pkg_dir)
            
        tsconfig_path = os.path.join(full_path, 'tsconfig.json')
        if os.path.exists(tsconfig_path):
            print(f"Standardizing {pkg_dir}/tsconfig.json")
            standardize_tsconfig(tsconfig_path)
            
        # Cleanup legacy files
        for legacy in ['.npmignore', 'jest.config.js']:
            legacy_path = os.path.join(full_path, legacy)
            if os.path.exists(legacy_path):
                print(f"Removing legacy file: {pkg_dir}/{legacy}")
                os.remove(legacy_path)

if __name__ == '__main__':
    main()
