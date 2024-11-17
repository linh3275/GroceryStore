import classes from './button.module.css';

export default function Button({
    type, text, onClick, color,
    backgroundColor,
    width, height,
}) {
  return (
    <div className={classes.container}>
      <button
        style={{
          color, backgroundColor,
          width, height
        }}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}

Button.defaultProps = {
  type: 'button',
  text: 'Submit',
  backgroundColor: 'var(--paolo-veronese-green)',
  color: 'white',
  width: '12rem',
  height: '2rem'
}