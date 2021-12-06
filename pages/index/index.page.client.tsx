import { Skeleton, Typography } from '@mui/material';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'vditor/dist/index.css';
import Root from './components/Root';
import { AuthContextProvider, reducer } from './contexts/AuthContext';
import { ReplyContextProvider, reducer as replyReducer } from './contexts/ReplyContext';

const SearchPage = lazy(() => import('./pages/SearchPage'));
const TopicPage = lazy(() => import('./pages/TopicPage'));
const IndexPage = lazy(() => import('./pages/IndexPage'));
const CreateTopicPage = lazy(() => import('./pages/CreateTopicPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));

const Page = () => (
  <AuthContextProvider reducer={reducer}>
    <ReplyContextProvider reducer={replyReducer}>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route
              path="login"
              element={
                <Suspense fallback={<Skeleton />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="account"
              element={
                <Suspense fallback={<Skeleton />}>
                  <AccountPage />
                </Suspense>
              }
            />
            <Route
              path="search/topics"
              element={
                <Suspense fallback={<Skeleton />}>
                  <SearchPage />
                </Suspense>
              }
            />
            <Route
              path="topic/:topicId"
              element={
                <Suspense fallback={<Skeleton />}>
                  <TopicPage />
                </Suspense>
              }
            />
            <Route
              path="createTopic"
              element={
                <Suspense fallback={<Skeleton variant="rectangular" height={92} />}>
                  <CreateTopicPage />
                </Suspense>
              }
            />
            <Route
              index
              element={
                <Suspense fallback={<Typography>网页加载中</Typography>}>
                  <IndexPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ReplyContextProvider>
  </AuthContextProvider>
);

ReactDOM.render(<Page />, window.document.getElementById('page-view'));

export default Page;
