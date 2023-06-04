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

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <GeneralProvider>
            <UIProvider>
              <Scroll showBelow={250} />
              <ScrollToTop />
              <StyledChart />
              <AppDrawer />
              <SearchBox />
              <Router />
            </UIProvider>
          </GeneralProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
