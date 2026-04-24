import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { exampleTracks } from '@/data/exampleTracks'
import { useTrack } from '@/hooks/use-track'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'

export function TrackSelector() {
  const { setSelectedTrack } = useTrack()
  const navigate = useNavigate()

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrack(trackId)
    navigate('/lesson/getting-started/what-youll-learn')
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-8 xl:max-w-5xl 2xl:max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Choose Your Project
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Same AI-Native techniques, different examples. Pick the one that interests you most.
          </p>
        </div>

        {/* Track Cards */}
        <div className="grid gap-4 mb-12">
          {exampleTracks.map((track) => (
            <Card 
              key={track.id}
              className="group hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer overflow-hidden"
              onClick={() => handleSelectTrack(track.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <span className="text-4xl flex-shrink-0">{track.icon}</span>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {track.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {track.industry}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm mb-3">
                      {track.description}
                    </CardDescription>
                    
                    {/* What You'll Build - Highlighted */}
                    <div className="bg-primary/5 border border-primary/10 rounded-md px-3 py-2 inline-block">
                      <p className="text-sm">
                        <span className="font-medium text-foreground">You'll build:</span>{' '}
                        <span className="text-muted-foreground">{track.whatYouBuild}</span>
                      </p>
                    </div>
                  </div>

                  {/* Select Button */}
                  <Button 
                    size="sm"
                    className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectTrack(track.id)
                    }}
                  >
                    Select
                    <ArrowRight className="ml-1" size={16} weight="bold" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* What You'll Learn - Moved below */}
        <div className="border border-dashed border-neutral-6 rounded-lg p-6 bg-muted/30">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-base font-semibold text-center">What You'll Learn</h2>
            <Badge variant="outline" className="text-xs">~2 hours • No coding required</Badge>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm max-w-2xl mx-auto">
            {/* Beginner Skills */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Foundation</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="text-primary flex-shrink-0" size={16} weight="fill" />
                <span>Build working apps with plain English prompts</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="text-primary flex-shrink-0" size={16} weight="fill" />
                <span>Write requirements AI can understand</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="text-primary flex-shrink-0" size={16} weight="fill" />
                <span>Break work into verifiable tasks</span>
              </div>
            </div>
            {/* Advanced Skills */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Advanced</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="text-primary flex-shrink-0" size={16} weight="fill" />
                <span>Set rules that control AI behavior</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="text-primary flex-shrink-0" size={16} weight="fill" />
                <span>Create custom agents (test, docs, review)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="text-primary flex-shrink-0" size={16} weight="fill" />
                <span>Build reusable Agent Skills</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          First time building? Perfect. These AI-Native techniques work for beginners and pros alike.
        </p>
      </div>
    </div>
  )
}
