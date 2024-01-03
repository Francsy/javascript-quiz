import { useQuestionsStore } from "../store/questions";

export const useQuestionsData = () => {
    const questions = useQuestionsStore(state => state.questions); // Tip: it is possible to write { questions } = useQuestionsStore(state => state) but that make the app to check any changes in the entire state which is an effect we don't want

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach(question => {
        const { userSelectedAnswer, correctAnswer } = question;
        if (userSelectedAnswer == null) unanswered++;
        else if (userSelectedAnswer === correctAnswer) correct++;
        else incorrect++;
    });
    return { correct, incorrect, unanswered };
};
