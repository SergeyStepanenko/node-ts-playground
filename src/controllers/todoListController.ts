import * as mongoose from 'mongoose'
import { Request, Response } from 'express'

const Task = mongoose.model('Tasks')

export function listAllTasks(req: Request, res: Response) {
  Task.find({}, (error, task) => {
    if (error) {
      res.send(error)
    }

    res.json(task)
  })
}

export function createTask(req: Request, res: Response) {
  const newTask = new Task(req.body)

  newTask.save((error, task) => {
    if (error) {
      res.send(error)
    }

    res.json(task)
  })
}

export function readTask(req: Request, res: Response) {
  Task.findById(req.params.taskId, function(error, task) {
    if (error) {
      res.send(error)
    }

    res.json(task)
  })
}

export function updateTask(req: Request, res: Response) {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    (error, task) => {
      if (error) {
        res.send(error)
      }

      res.json(task)
    }
  )
}

export function deleteTask(req: Request, res: Response) {
  Task.remove(
    {
      _id: req.params.taskId
    },
    (error: any): void => {
      if (error) {
        res.send(error)
      }

      res.json({ message: 'Task successfully deleted' })
    }
  )
}
