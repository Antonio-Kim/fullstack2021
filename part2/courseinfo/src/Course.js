import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Total = ({ course }) => {
  const exercises = course.parts.map(value => value.exercises)
  const sum = exercises.reduce((s,p) => s+p)
  //
  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}


const Content1 = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
      <Part part={course.parts[3]} />
      <Total course={course} />
    </div>
  )
}

const Course1 = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content1 course={course} />
    </>
  )
}

const Content2 = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Total course={course} />
    </div>
  )
}

const Course2 = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content2 course={course} />
    </>
  )
}

const Course = ({course}) => {
  const firstCourse = course[0]
  const secondCourse = course[1]
  return (
  <>
    <Course1 course={firstCourse} />
    <Course2 course={secondCourse} />
  </>
  )
}

export default Course;
  