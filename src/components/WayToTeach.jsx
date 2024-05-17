export default function WayTOTeach(props){
    console.log(props)
    return(
      <li>
          <p>
            <strong>{props.title} </strong> 
              {props.description}
          </p>
      </li>
    )
  }