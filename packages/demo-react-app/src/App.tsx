import { ParallaxProvider } from "react-scroll-parallax";
import { RendrPage, RendrRouter } from "@rendr-view/rendr-router";
import components from "./rendr/components";
import templates from "./rendr/templates";
import routes from "./rendr/routes";
import TransitionScreen from "./components/TransitionScreen";

function App() {
  return (
    <ParallaxProvider>
      <RendrRouter templates={templates} blocks={components} routes={routes}>
        {({ isLoading, ...pageProps }) => (
          <div className="app relative">
            <RendrPage {...pageProps} />
            <TransitionScreen isLoading={isLoading} />
          </div>
        )}
      </RendrRouter>
    </ParallaxProvider>
  );
}

export default App;
