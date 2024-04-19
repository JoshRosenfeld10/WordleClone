import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { KeyboardContext } from '../App';
import { useContext, useEffect, useState } from 'react';

/* 
Light Grey: #808384
Dark Grey: #3a3a3c
Green: #538d4e
Yellow: #b49f3a
*/

const backgroundStyle = {
  light_grey: {
    backgroundColor: '#808384'
  },
  dark_grey: {
    backgroundColor: '#3a3a3c'
  },
  green: {
    backgroundColor: '#538d4e'
  },
  yellow: {
    backgroundColor: '#b49f3a'
  }
}

function Key({ character, handleKeyDown }) {

  const keyboardColours = useContext(KeyboardContext);
  const [colour, setColour] = useState('light_grey')
  const lowercaseCharacter = character.toLowerCase();

  useEffect(() => {
    if (!keyboardColours[lowercaseCharacter]) {
      setColour('light_grey')
    } else if (keyboardColours[lowercaseCharacter] == 'dark_grey') {
      setColour('dark_grey')
    } else if (keyboardColours[lowercaseCharacter] == 'green') {
      setColour('green')
    } else if (keyboardColours[lowercaseCharacter] == 'yellow') {
      setColour('yellow')
    }
  }, [keyboardColours])

  return (
    <button className={character === 'ENTER' || character === 'BACKSPACE'
    ? "text-white h-[58px] w-[68px] rounded-[4px] flex justify-center items-center text-xs font-[600]"
    : "text-white h-[58px] w-11 rounded-[4px] flex justify-center items-center text-xl font-[600]"}
    style={backgroundStyle[colour]}
    onClick={handleKeyDown}
    id={character}
    >
        {character === 'BACKSPACE' ? <BackspaceOutlinedIcon fontSize='small' className='pointer-events-none'/> : character}
    </button>
    
  )
}

export default Key