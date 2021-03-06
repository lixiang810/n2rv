import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Chip, Fab, Stack, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setPage } from '../../redux/pageSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import useScrollProgress from '../../utils/useScrollProgress';
import TopicElement from './TopicElement';

const TopicTableMobile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { topicList, loading, page, lastPage } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();
  const scrollProgress = useScrollProgress();

  return (
    <Stack spacing={1}>
      {topicList.map((topic) => (
        <TopicElement
          topic={topic}
          key={topic.topicID}
          onClick={(e) => {
            e.preventDefault();
            scrollProgress.save();
            navigate(`/topic/${topic.topicID}`);
          }}
        />
      ))}

      <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Stack alignItems="center" spacing={1}>
          <Fab
            size="small"
            color="primary"
            onClick={() => {
              scrollProgress.save();
              navigate('/createTopic');
            }}
          >
            <AddIcon />
          </Fab>
          <Fab
            style={
              loading || page === 1
                ? undefined
                : {
                    backgroundColor: theme.palette.error.light,
                    color: theme.palette.error.contrastText,
                  }
            }
            disabled={loading || page === 1}
            size="small"
            onClick={
              page !== 1
                ? () => {
                    dispatch(setPage(page - 1));
                  }
                : undefined
            }
          >
            <ArrowBackIcon />
          </Fab>
          <Chip color="warning" size="small" label={`${page} / ${lastPage}`} />
          <Fab
            style={
              loading || page >= lastPage
                ? undefined
                : {
                    backgroundColor: theme.palette.success.light,
                    color: theme.palette.success.contrastText,
                  }
            }
            size="small"
            disabled={loading || page >= lastPage}
            onClick={
              page < lastPage
                ? () => {
                    dispatch(setPage(page + 1));
                  }
                : undefined
            }
          >
            <ArrowForwardIcon />
          </Fab>
        </Stack>
      </div>
    </Stack>
  );
};

export default TopicTableMobile;
