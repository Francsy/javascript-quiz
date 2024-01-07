import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Question } from '../types';
import confetti from 'canvas-confetti';
import { getRandomQuestions } from '../services/questions';

interface State {
    questions: Question[],
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
}

// persist is used to save the state in localstorage to not lose it when reload

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        questions: [],

        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
            const questions = await getRandomQuestions(limit);
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
            if (isCorrectUserAnswer) confetti();
            // We change this info in the copy of the question
            newQuestions[questionIndex] = {
                ...questionInfo,
                userSelectedAnswer: answerIndex,
                isCorrectUserAnswer
            };
            // We update the state:
            set({ questions: newQuestions });
        },

        goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) set({ currentQuestion: nextQuestion });
        },

        goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;
            if (previousQuestion >= 0) set({ currentQuestion: previousQuestion });
        },

        reset: () => set({ questions: [], currentQuestion: 0 })
    };
}, {
    name: 'questions'
}));