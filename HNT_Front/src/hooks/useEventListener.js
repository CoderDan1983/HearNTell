import { useEffect, useRef } from "react"

export default function useEventListener(
  eventType,
  callback, //* that callback function will run when the event listener is run.
  element = window //* this may not always be an element?  (see useMediaQuery.js)
) { //* ... but it will be something we are watching :)
  const callbackRef = useRef(callback)

  useEffect(() => {  //* if that callback function changes for some reason, update it here.
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (element == null) return
    //* this creates an event handler which will run the event handler passed in and held
    //in callbackRef
    const handler = e => callbackRef.current(e) 
    element.addEventListener(eventType, handler)
    //* when this component is destroyed, remove the event listener (ie, the handler) :)
    return () => element.removeEventListener(eventType, handler)  
  }, [eventType, element])
}