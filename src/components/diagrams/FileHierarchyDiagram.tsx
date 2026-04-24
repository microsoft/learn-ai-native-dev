import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Folder, 
  File, 
  FileCode, 
  Robot, 
  Eye,
  CheckCircle,
  Info
} from '@phosphor-icons/react'

interface FileNode {
  name: string
  type: 'folder' | 'file'
  icon?: React.ReactNode
  description?: string
  scope?: string
  highlight?: 'global' | 'project' | 'agent'
  children?: FileNode[]
}

const fileStructure: FileNode[] = [
  {
    name: '.github/',
    type: 'folder',
    children: [
      {
        name: 'copilot-instructions.md',
        type: 'file',
        icon: <FileCode size={16} weight="duotone" className="text-emerald-500" />,
        description: 'Rules Copilot follows in ALL interactions',
        scope: 'Global — Every chat session',
        highlight: 'global'
      },
      {
        name: 'agents/',
        type: 'folder',
        children: [
          {
            name: 'test-agent.agent.md',
            type: 'file',
            icon: <Robot size={16} weight="duotone" className="text-pink-500" />,
            description: 'QA specialist persona',
            scope: 'When selected in agent picker',
            highlight: 'agent'
          },
          {
            name: 'docs-agent.agent.md',
            type: 'file',
            icon: <Robot size={16} weight="duotone" className="text-pink-500" />,
            description: 'Documentation writer persona',
            scope: 'When selected in agent picker',
            highlight: 'agent'
          },
          {
            name: 'review-agent.agent.md',
            type: 'file',
            icon: <Robot size={16} weight="duotone" className="text-pink-500" />,
            description: 'Code reviewer persona',
            scope: 'When selected in agent picker',
            highlight: 'agent'
          }
        ]
      }
    ]
  },
  {
    name: 'AGENTS.md',
    type: 'file',
    icon: <FileCode size={16} weight="duotone" className="text-amber-500" />,
    description: 'Project context, build commands, standards',
    scope: 'Project-wide — All agents read this',
    highlight: 'project'
  },
  {
    name: 'specs/',
    type: 'folder',
    children: [
      {
        name: 'PRD.md',
        type: 'file',
        icon: <File size={16} weight="duotone" className="text-blue-500" />,
        description: 'Your project requirements (R1, R2, etc.)',
        scope: 'Referenced by agents when needed'
      },
      {
        name: 'Tasks.md',
        type: 'file',
        icon: <CheckCircle size={16} weight="duotone" className="text-blue-500" />,
        description: 'Task checklist AI updates as it works',
        scope: 'Referenced by agents when needed'
      }
    ]
  }
]

function FileTreeNode({ 
  node, 
  depth = 0, 
  selectedFile, 
  onSelect 
}: { 
  node: FileNode
  depth?: number
  selectedFile: string | null
  onSelect: (name: string, node: FileNode) => void
}) {
  const [isOpen, setIsOpen] = useState(true)
  const isFolder = node.type === 'folder'
  const isSelected = selectedFile === node.name
  
  const highlightColors = {
    global: 'border-emerald-500/50 bg-emerald-500/10',
    project: 'border-amber-500/50 bg-amber-500/10',
    agent: 'border-pink-500/50 bg-pink-500/10'
  }

  return (
    <div className="select-none">
      <div
        className={`
          flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer
          transition-all duration-200
          ${isSelected 
            ? 'bg-primary/10 border border-primary/30' 
            : node.highlight 
              ? `border ${highlightColors[node.highlight]} hover:border-opacity-100`
              : 'hover:bg-muted/50 border border-transparent'
          }
        `}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (isFolder) {
            setIsOpen(!isOpen)
          }
          if (node.description) {
            onSelect(node.name, node)
          }
        }}
      >
        {isFolder ? (
          <Folder 
            size={16} 
            weight={isOpen ? 'duotone' : 'regular'} 
            className={`shrink-0 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`}
          />
        ) : (
          node.icon || <File size={16} weight="duotone" className="shrink-0 text-muted-foreground" />
        )}
        <span className={`text-sm ${node.highlight ? 'font-medium text-foreground' : 'text-foreground/80'}`}>
          {node.name}
        </span>
        {node.highlight && (
          <span className={`
            ml-auto text-xs px-1.5 py-0.5 rounded
            ${node.highlight === 'global' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : ''}
            ${node.highlight === 'project' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : ''}
            ${node.highlight === 'agent' ? 'bg-pink-500/20 text-pink-600 dark:text-pink-400' : ''}
          `}>
            {node.highlight === 'global' && 'Global'}
            {node.highlight === 'project' && 'Project'}
            {node.highlight === 'agent' && 'Specialist'}
          </span>
        )}
      </div>
      
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode
              key={index}
              node={child}
              depth={depth + 1}
              selectedFile={selectedFile}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileHierarchyDiagram() {
  const [selectedFile, setSelectedFile] = useState<string | null>('copilot-instructions.md')
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(
    fileStructure[0].children?.[0] || null
  )

  const handleSelect = (name: string, node: FileNode) => {
    setSelectedFile(name)
    setSelectedNode(node)
  }

  return (
    <div
      className="my-6"
      role="figure"
      aria-label="Project file structure diagram showing the hierarchy of AI instruction files: .github/copilot-instructions.md for global rules, AGENTS.md for project context, and .github/agents/ folder containing specialist agent files. Click files to see what AI reads from each."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* File Tree */}
        <Card className="p-4 bg-muted/30 border-border">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
            <Folder size={18} weight="duotone" className="text-primary" />
            <span className="font-heading font-semibold text-sm text-foreground">
              Project Structure
            </span>
          </div>
          <div className="space-y-0.5">
            {fileStructure.map((node, index) => (
              <FileTreeNode
                key={index}
                node={node}
                selectedFile={selectedFile}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </Card>

        {/* Details Panel */}
        <Card className="p-4 bg-muted/30 border-border">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
            <Eye size={18} weight="duotone" className="text-primary" />
            <span className="font-heading font-semibold text-sm text-foreground">
              What AI Sees
            </span>
          </div>
          
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {selectedNode.icon}
                  <span className="font-mono text-sm font-medium text-foreground">
                    {selectedNode.name}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>
              
              {selectedNode.scope && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-background/50 border border-border">
                  <Info size={16} className="shrink-0 mt-0.5 text-primary" />
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      When it's read
                    </span>
                    <p className="text-sm text-foreground mt-1">
                      {selectedNode.scope}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Click a highlighted file to see details
            </p>
          )}
        </Card>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-emerald-500/30 border border-emerald-500/50" />
          <span>Global rules (all chats)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-500/30 border border-amber-500/50" />
          <span>Project context</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-pink-500/30 border border-pink-500/50" />
          <span>Specialist agents</span>
        </div>
      </div>
    </div>
  )
}
