const URL = import.meta.env.BASE_URL;

export const getRandomQuestions = async (limit: number) => {
    const res = await fetch(`${URL}data.json`);
    const json = await res.json();
    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
    return questions;
};