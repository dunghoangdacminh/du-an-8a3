"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Music, Volume2, VolumeX, Play, Pause, ChevronDown } from "lucide-react"

interface MusicTrack {
  id: string
  name: string
  url: string
}

interface MusicSelectorProps {
  tracks: MusicTrack[]
  className?: string
}

export default function MusicSelector({ tracks, className = "" }: MusicSelectorProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playTrack = async (track: MusicTrack) => {
    try {
      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }

      // Create new audio instance
      const audio = new Audio(track.url)
      audio.loop = true
      audio.volume = isMuted ? 0 : 0.7

      // Set up event listeners
      audio.addEventListener("canplaythrough", () => {
        setAudioLoaded(true)
        setAudioError(null)
      })

      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e)
        setAudioError(`Không thể phát "${track.name}". Vui lòng thử bài khác.`)
        setIsPlaying(false)
        setAudioLoaded(false)
      })

      audio.addEventListener("ended", () => {
        setIsPlaying(false)
      })

      audioRef.current = audio
      setCurrentTrack(track)
      setAudioLoaded(false)
      setAudioError(null)

      // Try to play
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        await playPromise
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Error playing track:", error)
      setAudioError(`Không thể phát "${track.name}". Vui lòng thử lại.`)
      setIsPlaying(false)
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error("Error resuming audio:", error)
            setAudioError("Không thể tiếp tục phát nhạc.")
          })
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted
      audioRef.current.volume = newMutedState ? 0 : 0.7
      setIsMuted(newMutedState)
    }
  }

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Main Music Control */}
      <div className="flex items-center space-x-4">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className={`bg-gradient-to-r ${
                currentTrack
                  ? "from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  : "from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              } text-white text-lg px-6 py-3 h-auto min-w-[200px] justify-between`}
            >
              <div className="flex items-center">
                <Music className="mr-3 h-6 w-6" />
                <span>{currentTrack ? currentTrack.name : "Chọn Nhạc"}</span>
              </div>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 max-h-64 overflow-y-auto">
            {tracks.map((track) => (
              <DropdownMenuItem
                key={track.id}
                onClick={() => {
                  playTrack(track)
                  setIsDropdownOpen(false)
                }}
                className={`cursor-pointer ${currentTrack?.id === track.id ? "bg-blue-50 dark:bg-blue-900" : ""}`}
              >
                <Music className="mr-2 h-4 w-4" />
                <span className="truncate">{track.name}</span>
                {currentTrack?.id === track.id && (
                  <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Play/Pause Button */}
        {currentTrack && (
          <Button
            size="lg"
            variant="outline"
            onClick={togglePlayPause}
            disabled={!audioLoaded && !audioError}
            className="px-4 py-3"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        )}

        {/* Volume Button */}
        {currentTrack && isPlaying && (
          <Button size="lg" variant="outline" onClick={toggleMute} className="px-4 py-3">
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Current Track Info */}
      {currentTrack && (
        <div className="text-center">
          <p className="text-sm text-blue-100 mb-1">Đang phát:</p>
          <p className="text-lg font-medium text-white">{currentTrack.name}</p>
          {isPlaying && (
            <div className="flex items-center justify-center mt-2">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-4 bg-white rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "1s",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {audioError && (
        <div className="bg-red-500/70 text-white p-3 rounded-lg max-w-md text-center">
          <p className="text-sm">{audioError}</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAudioError(null)}
            className="mt-2 text-white border-white hover:bg-white hover:text-red-500"
          >
            Đóng
          </Button>
        </div>
      )}

      {/* Loading State */}
      {currentTrack && !audioLoaded && !audioError && (
        <div className="text-white text-sm">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Đang tải nhạc...</span>
          </div>
        </div>
      )}
    </div>
  )
}
