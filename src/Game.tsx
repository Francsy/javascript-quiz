import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useQuestionsStore } from "./store/questions";
import SyntaxHighLighter from "react-syntax-highlighter";
import { /* gradientDark */ xt256 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { type Question as QuestionType } from "./types";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Footer } from './Footer';

// We create this function outside to not create it every time we render the Question component:
const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;
    // if user doesn't select anything yet:
    if (userSelectedAnswer == null) return 'transparent';
    // if this is not the selected option nor the correct one and user already made its choice:
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
    // If this is the user selection and it's correct:
    if (index === correctAnswer) return 'green';
    // If this is the user selection but it's not correct:
    if (index === userSelectedAnswer) return 'red';
    return 'transparent';
};

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer);

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex);
    };

    return (
        <Card variant='outlined' sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}>
            <Typography variant='h5'>
                {info.question}
            </Typography>
            <SyntaxHighLighter language='javascript' style={xt256} >
                {info.code}
            </SyntaxHighLighter>
            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, i) => (
                    <ListItem key={i} disablePadding divider>
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            onClick={createHandleClick(i)}
                            sx={{
                                backgroundColor: getBackgroundColor(info, i),
                                textAlign: 'center'
                            }}
                        >
                            <ListItemText primary={
                                <span style={{ fontWeight: 'bold' }}>{answer}</span>
                            } />
                        </ListItemButton >
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export const Game = () => {

    const [
        questions,
        currentQuestion,
        goNextQuestion,
        goPreviousQuestion
    ] = useQuestionsStore(state => [
        state.questions,
        state.currentQuestion,
        state.goNextQuestion,
        state.goPreviousQuestion
    ]);

    const questionInfo = questions[currentQuestion];

    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    <ArrowForwardIos />
                </IconButton>


            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    );

};