import { Container, Theme } from './settings/types';
import { BookLandingPage } from './components/generated/BookLandingPage';
import { PrivacyPage } from './components/site/PrivacyPage';
import { SiteChrome } from './components/site/SiteChrome';
import { HOME_PATH, PRIVACY_PATH, WRITING_PATH } from './components/site/siteConfig';
import { WritingPage } from './components/site/WritingPage';

let theme: Theme = 'light';
let container: Container = 'none';

function normalizePath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized === '' ? HOME_PATH : `${normalized}/`;
}

function renderRoute(pathname: string) {
  switch (pathname) {
    case WRITING_PATH:
      return <WritingPage />;
    case PRIVACY_PATH:
      return <PrivacyPage />;
    default:
      return <BookLandingPage />;
  }
}

function App() {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const currentPath = typeof window === 'undefined' ? HOME_PATH : normalizePath(window.location.pathname);
  const routedPage = <SiteChrome>{renderRoute(currentPath)}</SiteChrome>;

  if (container === 'centered') {
    return <div className="h-full w-full">{routedPage}</div>;
  }

  return routedPage;
}

export default App;
