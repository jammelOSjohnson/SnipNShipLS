import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import AppDrawer from './components/drawer';
import { UIProvider } from './context/ui';
import GeneralProvider from './context/general';
import SearchBox from './components/search';
import Scroll from './components/scroll';

// ----------------------------------------------------------------------

const App = function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <UIProvider>
            <Scroll showBelow={250} />
            <ScrollToTop />
            <StyledChart />
            <AppDrawer />
            <SearchBox />
            <Router />
          </UIProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default function () {
  return (
    <GeneralProvider>
      <App />
    </GeneralProvider>
  );
}
