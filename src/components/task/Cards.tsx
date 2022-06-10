import React from "react";
import Card from "./Card";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import styles from './Cards.module.css';
import {Task} from "../../types/task";

type Props = {tasks: Task[]};

export default function Cards(props: Props) {
  return (
      <div className={styles.wrapper}>
        <Link className='btn btn-primary my-4' to='/create-task/'>Create a task</Link>
        {props.tasks.map(task => <Card key={task.id} task={task}/>)}
        {props.tasks.length === 0 && <Alert variant='info'>You don't have any tasks</Alert>}
      </div>
  );
}