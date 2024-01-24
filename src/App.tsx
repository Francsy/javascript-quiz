import { useMediaQuery, Container, Stack, Typography } from '@mui/material';
import './App.css';
import { JavaScriptLogo } from './assets/JavaScriptLogo';
import { Start } from './Start';
import { useQuestionsStore } from './store/questions';
import { Game } from './Game';

function App() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const questions = useQuestionsStore(state => state.questions);
  return (
    <>
      <main>
        <Container maxWidth='sm'>
          <Stack direction={'row'} gap={2} alignItems='center' justifyContent='center'>
            <JavaScriptLogo isMobile={isMobile} />
            <Typography variant={isMobile ? 'h4' : 'h2'} component='h1'>
              Javascript Quiz
            </Typography>
          </Stack>
          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}

        </Container>
      </main>
    </>
  );
}

export default App;
