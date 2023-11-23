import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fillDurationVariables, updateProgress } from "../features/progress"

export default function AudioPlayer() {
  const dispatch = useDispatch()
  const playlist = useSelector(state => state.playlist)
  const audioRef = useRef()

  useEffect(() => {
    if(playlist.songs && playlist.play) {
      audioRef.current.play()
    }
    else {
      audioRef.current.pause()
    }
  }, [playlist])

  function handleLoadedData(e){
    if(playlist.songs) {
      dispatch(fillDurationVariables({
        currentTime: e.target.currentTime,
        totalDuration: e.target.duration,
      }))
    }
  }

  function handleTimeUpdate(e) {
    dispatch(updateProgress(e.target.currentTime))
  }

  return (
    <audio 
    className="outline-none"
    id="audio-player"
    src={playlist.songs?.find(obj => obj.id === playlist.currentMusicID).url}
    ref={audioRef}
    onLoadedData={handleLoadedData}
    onTimeUpdate={handleTimeUpdate}
    ></audio>
  )
}