import React from "react";
import {Button, Container, Form} from "react-bootstrap";
import {useInput} from "../../hooks/use-input";
import {createTaskAction} from "../../actions/task-actions";
import {useDispatch, useSelector} from "react-redux";
import {TaskData, CreateTaskReducerState} from "../../types/task";
import {AppDispatch} from "../../store/store";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/ui/Loader";

export default function CreateTask() {
  const {loading, error} = useSelector<CreateTaskReducerState, TaskData>(state => state.createTask);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    value: titleValue,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    reset: titleReset
  } = useInput<HTMLInputElement>(val => error ? !error.messages.title : !!val);

  const {
    value: contentValue,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    valueBlurHandler: contentBlurHandler,
    reset: contentReset
  } = useInput<HTMLInputElement>(_ => true);

  const {
    value: deadlineValue,
    valueChangeHandler: deadlineChangeHandler,
    valueBlurHandler: deadlineBlurHandler,
    reset: deadlineReset
  } = useInput<HTMLInputElement>(val => !!val);

  const {
    value: statusValue,
    hasError: statusHasError,
    valueChangeHandler: statusChangeHandler,
    valueBlurHandler: statusBlurHandler,
    reset: statusReset
  } = useInput<HTMLSelectElement>(val => !!val);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: titleValue,
      content: contentValue,
      deadline: new Date(deadlineValue),
      status_id: Number(statusValue)
    };
    dispatch(createTaskAction(data)).then(() => {
      if (!error) {
        navigate('/tasks/');
        titleReset();
        contentReset();
        deadlineReset();
        statusReset();
      }
    });
  };

  return (
      <Container className='mt-5' style={{width: '50rem'}}>
        <h1>Create a task</h1>
        {loading ? (
            <Loader/>
        ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="title-input">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    required
                    value={titleValue}
                    isInvalid={titleHasError}
                    onChange={titleChangeHandler}
                    onBlur={titleBlurHandler}
                    placeholder="Enter title"/>
                {error && <Form.Control.Feedback>{error.messages.title}</Form.Control.Feedback>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    type="password"
                    as='textarea'
                    value={contentValue}
                    isInvalid={contentHasError}
                    onChange={contentChangeHandler}
                    onBlur={contentBlurHandler}
                    placeholder="Enter Content"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Deadline</Form.Label>
                <input
                    required
                    type="datetime-local"
                    value={deadlineValue}
                    onChange={deadlineChangeHandler}
                    onBlur={deadlineBlurHandler}
                    className='form-control'/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                    required
                    value={statusValue}
                    isInvalid={statusHasError}
                    onChange={statusChangeHandler}
                    onBlur={statusBlurHandler}
                >
                  <option selected value={1}>Pending</option>
                  <option value={2}>Done</option>
                  <option value={3}>Delayed</option>
                  <option value={4}>Canceled</option>
                </Form.Select>
              </Form.Group>
              <Button className='my-4' variant="primary" type="submit">Submit</Button>
            </Form>
        )}
      </Container>
  );
}