import styles from "./keyboard.module.css";

const keys: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

type KeyboardProps = {
  activeLetters: string[]
  inactiveLetters: string[]
  addGuessedLetter: (letter: string) => void
}

export function Keyboard({activeLetters, inactiveLetters, addGuessedLetter}: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem"
      }}
    >
      {keys.map((key) => {
        return (
          <button key={key} onClick={() => addGuessedLetter(key)} className={styles.btn}>
            {key}
          </button>
        );
      })}
    </div>
  );
}
