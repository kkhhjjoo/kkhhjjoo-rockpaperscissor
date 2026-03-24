const Box = ({ title, myImg, comImg, you, result }) => {
  return (
    <div className={`box ${result}`}>
      <h1>{ title }</h1>
      <img className='item-img' src={you ? myImg : comImg} alt="가위바위보" />
      <h2>{result}</h2>
    </div>
  )
}

export default Box
