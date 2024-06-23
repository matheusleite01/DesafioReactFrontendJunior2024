import Filter from "../../components/Filter";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import InputForm from "../../components/Input";
import TodoList from "../../components/TodoList";
import useHomePage from "../../hooks/useHomePage";
import { ContainerHomePage, FormContainer, ListItem } from "./styled";

const Home = () => {
  const {
    handleSubmit,
    setValueInput,
    tasks,
    valueInput,
    enableAllTasks,
    tasksEnable,
    remainingTasks,
    clearEnableTasks,
  } = useHomePage();

  return (
    <ContainerHomePage>
      <Header titleText="todos" />
      <FormContainer taskEnabled={tasksEnable}>
        <InputForm
          placeholder="What needs to be done?"
          handleSubmit={handleSubmit}
          setValue={setValueInput}
          value={valueInput}
          handleClickIcon={enableAllTasks}
        />
        <ListItem taskHeightLimit={tasks?.length >= 8}>
          <TodoList ItemList={tasks} />
        </ListItem>
        <Filter
          itensList={`${remainingTasks?.length} items left!`}
          handleCompletedClick={clearEnableTasks}
        />
      </FormContainer>
      <Footer />
    </ContainerHomePage>
  );
};

export default Home;