import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useGlobalContext from "./useGlobalContext";
import Questionmark from "../assets/icons/Questionmark";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const useHomePage = () => {
  const {
    valueInput,
    setValueInput,
    tasks,
    incrementTasks,
    enableAllTasks,
    clearEnableTasks,
    initialData,
    pathname,
    savePreference,
    userPrefersSaving,
    setUserPrefersSaving,
    setTasks,
    isLoading,
    remainingTasks,
  } = useGlobalContext();

  const navigate = useNavigate();
  const [animationCount, setAnimationCount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);

  const tasksEnable = useMemo(
    () => (Array.isArray(tasks) && tasks.length ? tasks.every(({ isDone }) => isDone) : false),
    [tasks],
  );

  const stopAnimation =
    tasksEnable && remainingTasks === 0 && animationCount === 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (
        valueInput?.length === 0 ||
        valueInput?.length === 1 ||
        valueInput?.length >= 30
      ) {
        return toast.error("A tarefa deve conter de 2 a 30 caracteres.");
      }

      if (
        (tasks?.length === 0 || tasks?.length === 3) &&
        userPrefersSaving === null
      ) {
        toast((t) => (
          <Toast
            toastMessage="Gostaria de salvar as tarefas?"
            toastButtons={[
              <button key="sim" onClick={() => savePreference(t, "sim")}>
                Sim
              </button>,
              <button key="nao" onClick={() => savePreference(t, "nao")}>
                Não
              </button>,
            ]}
            icon={<Questionmark />}
          />
        ));
      }
      incrementTasks(valueInput);
    },
    [valueInput, incrementTasks, savePreference, tasks, userPrefersSaving],
  );

  const initializeData = async () => {
    if (pathname === "/") {
      navigate("all");
    }

    const [savedTasks, savedUserPrefersSaving] = [
      localStorage.getItem("tasks"),
      localStorage.getItem("userPrefersSaving"),
    ];

    if (savedUserPrefersSaving) {
      setUserPrefersSaving(savedUserPrefersSaving);
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    if (!savedTasks || savedUserPrefersSaving === "nao") {
      await initialData();
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    if (stopAnimation) {
      toast.success("Parabéns, Você completou todas as suas tarefas!");
      setAnimationCount((prev) => prev + 1);
      setStartAnimation(true);
    }
  }, [tasksEnable, remainingTasks]);

  return {
    handleSubmit,
    setValueInput,
    tasks,
    valueInput,
    enableAllTasks,
    tasksEnable,
    remainingTasks,
    clearEnableTasks,
    isLoading,
    startAnimation,
  };
};

export default useHomePage;
