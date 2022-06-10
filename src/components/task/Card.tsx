import React, {useCallback} from "react";
import {Button, ButtonGroup, Card as BootstrapCard} from 'react-bootstrap';
import {Color} from "react-bootstrap/types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {Status, Task} from "../../types/task";
import {deleteTaskAction, getTasksAction} from "../../actions/task-actions";

type Props = { task: Task };

type ColorPalette = {
  background: Color;
  text: Color;
}

export default function Card(props: Props) {
  const getColor = useCallback((status: Status): ColorPalette => {
    const statusPalette = new Map<Status, ColorPalette>([
      ['Pending', {background: 'light', text: 'dark'}],
      ['Done', {background: 'success', text: 'light'}],
      ['Delayed', {background: 'warning', text: 'light'}],
      ['Canceled', {background: 'danger', text: 'light'}]
    ]);
    return statusPalette.get(status) || {background: 'primary', text: 'light'};
  }, [props.task.status]);

  const color = getColor(props.task.status);
  const deadline = new Date(props.task.deadline);
  const deadline_formatted = `${deadline.toLocaleDateString()} ${deadline.toLocaleTimeString()}`;
  const dispatch = useDispatch<AppDispatch>();

  const deleteHandler = () => {
    dispatch(deleteTaskAction(props.task.id)).then(() => {
      dispatch(getTasksAction()).then();
    });
  };

  return (
      <BootstrapCard bg={color.background} text={color.text} className="mb-2" style={{width: '45rem'}}>
        <BootstrapCard.Header style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{props.task.status}</span>
          <span>{deadline_formatted}</span>
        </BootstrapCard.Header>
        <BootstrapCard.Body style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div>
            <BootstrapCard.Title>{props.task.title}</BootstrapCard.Title>
            <BootstrapCard.Text>{props.task.content}</BootstrapCard.Text>
          </div>
          <ButtonGroup aria-label="Basic example" style={{height: '40px'}}>
            <Button variant="primary">See more</Button>
            <Button onClick={deleteHandler} variant="danger">Delete</Button>
          </ButtonGroup>
        </BootstrapCard.Body>
      </BootstrapCard>
  );
}