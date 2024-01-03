import { Card, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useQuestionsStore } from "./store/questions";
import SyntaxHighLighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { type Question as QuestionType } from "./types";

const Question = ({ info }: { info: QuestionType }) => {
    return (
        <Card variant='outlined' sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}>
            <Typography variant='h5'>
                {info.question}
            </Typography>
            <SyntaxHighLighter language='javascript' style={gradientDark} >
                {info.code}
            </SyntaxHighLighter>
            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, i) => (
                    <ListItem key={i} disablePadding divider>
                        <ListItemButton sx={{ textAlign: 'center' }}>
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
    const questions = useQuestionsStore(state => state.questions);
    const currentQuestion = useQuestionsStore(state => state.currentQuestion);
    const questionInfo = questions[currentQuestion];
    return (
        <>
            <Question info={questionInfo} />
        </>
    );

};