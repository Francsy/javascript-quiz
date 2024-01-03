import { create } from 'zustand';
import { Question } from '../types';

interface State {
    questions: Question[],
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
}

export const useQuestionsStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json');
            const json = await res.json();
            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
            set({ questions });
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            // We use structuredClone to clone the object:
            const newQuestions = structuredClone(questions);
            // We find the question index:
            const questionIndex = newQuestions.findIndex(q => q.id === questionId);
            // We get the question info: 
            const questionInfo = newQuestions[questionIndex];
            // We find out if the user selected the correct answer
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
            // We change this info in the copy of the question
            newQuestions[questionIndex] = {
                ...questionInfo,
                userSelectedAnswer: answerIndex,
                isCorrectUserAnswer
            };
            // We update the state:
            set({ questions: newQuestions });
        }
    };
});