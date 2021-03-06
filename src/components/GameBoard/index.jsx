import React from 'react'
import './styles.css'
import GameTile from './GameTile'
import { getRowCount } from '../../helpers'
import sample_questions from '../../questions'

//@TODO fix min height and stuff for different cases
const colWidth = `1fr`
const rowHeight = `1fr`

const questionsCsv = new Blob([sample_questions], {type: 'text/plain'});

const GameBoard = ({questionMap, setQuestion, possibleOtherKeys}) => {
  const categories = Object.keys(questionMap)
  const rowCount = getRowCount(questionMap)

  return (
    <>
    {
      categories.length > 0 ? <div style={{gridTemplateColumns: `repeat(${categories.length},${colWidth})`, gridTemplateRows: `repeat(${rowCount}, ${rowHeight})`}} className="game-board">
      {categories.map((category, colIndex) => {
        const questionValues = Object.keys(questionMap[category])
        return <React.Fragment key={category}>
          <GameTile category={category} isHeader style={{gridArea: `${1} / ${colIndex+1}`}} />
          {questionValues.map((questionValue, rowIndex) => {
          const question = questionMap[category][questionValue]
          return <GameTile key={colIndex + '_' + rowIndex} style={{gridArea: `${rowIndex+1+1} / ${colIndex+1}`}} onClick={() => !question.answered && setQuestion(question)} {...question} />
        })}
        </React.Fragment>
      })}
    </div> : <div className="board empty">
      <div className="max-width">Import questions from a CSV fie using the button on the left. CSV file must have the following column headers: <em>question</em>, <em>answer</em>, <em>category</em>, <em>value</em>
      <p>
        Download <a href={URL.createObjectURL(questionsCsv)} download="sample_questions.csv">example csv file</a>
      </p>
      <p>
        Be sure to set the clicker key for each player on the left by clicking the "Set" button for each player.
      </p>
      <p>
        The clicker key can be any single character, or one of the following: {possibleOtherKeys.join(', ')}.
      </p>
      </div>
      </div>
    }
    </>
  )
}

GameBoard.propTypes = {

}

export default GameBoard