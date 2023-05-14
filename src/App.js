import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import Appbar from './components/appbar';
import AppDrawer from './components/drawer';
import { UIProvider } from './context/ui';
import SearchBox from './components/search';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <UIProvider>
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
}
