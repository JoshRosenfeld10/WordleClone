import Key from "./Key";

const keyboardCharacters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

function Keyboard() {

  return (
    <div className="flex flex-col w-full h-full items-center justify-between gap-2">
        {keyboardCharacters.map((row) => (
            <div className="flex justify-center gap-[.35rem]" key={row}>
                {row.map((character) => (
                    <Key character={character} key={character}/>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Keyboard