import React from "react";

export default function PeopleQueue(props) {
  return (
    <div className='peopleList'>

      { props.adopt && console.log(props)
        (<div className='adoptMessage emphasis'>
          <p>Hooray! Your up {props.queue[0]}</p>
          <p>Now choose your pet!!</p>
        </div>)
      }

      <ol className='peopleListSection'>
        {props.queue.map((person, index) =>
          (<li 
            className='peopleListItems'
            key={index}>
            {person}
          </li>))
        }
      </ol>
      
    </div>
  );
}
