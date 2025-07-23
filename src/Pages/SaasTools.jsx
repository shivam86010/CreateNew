import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/Ui/Card";
import { Button } from "../Components/Ui/Button";
import { Input } from "../Components/Ui/Input";
import { Textarea } from "../Components/Ui/TextArea";
import { Badge } from "../Components/Ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Components/Ui/Tabs';
import { 
  Palette, 
  FileText, 
  Eye, 
  Copy, 
  Download, 
  RefreshCw, 
  Check,
  Hash,
  Type,
  Pipette
} from "lucide-react"

import { useToast } from "../Hooks/use-toast";
export default function SaasTools() {
  const { toast } = useToast();

  // Color Palette Generator State
  const [colorPalette, setColorPalette] = useState([]);
  const [baseColor, setBaseColor] = useState("#3b82f6");

  //for Notepad State
  const [savedNotes, setSavedNotes] = useState([]);
  const [notepadContent, setNotepadContent] = useState("");

  // Markdown Previewer State
  const [markdownText, setMarkdownText] = useState(`# Welcome to Markdown Previewer

    ## Features
    - **Bold text** and *italic text*
    - [Links](https://example.com)
    - \`inline code\` and code blocks
    - Lists and more!

    ### Code Example
    \`\`\`javascript
    function hello() {
      console.log("Hello, world!");
    }
    \`\`\`

    ### List Example
    1. First item
    2. Second item
      - Nested item
      - Another nested item

    > This is a blockquote
    > 
    > It can span multiple lines`);

  //generate color function 
  const generateColorPalette = ()=>{
    const baseHex=baseColor.replace("#", ""); //remove # 
    const r=parseInt(baseHex.substring(0, 2), 16); //convert hexadecimal to decimal
    const g=parseInt(baseHex.substring(2, 4), 16);
    const b=parseInt(baseHex.substring(4, 6), 10);
    
    const palette = [] ; //store all generated color variation 
    const variations = [      //generate variations 
      {name : "Base", factor : 1},
      {name : "Light" , factor : 1.3},
      {name : "Lighter" , factor : 1.6},
      {name : "Dark" , factor : 0.7},
      {name : "Darker", factor : 0.4},
    ]

    variations.forEach( variation => {
      const newR = Math.min(255, Math.round(r*variation.factor));
      const newG = Math.min(255, Math.round(g*variation.factor));
      const newB = Math.min(255, Math.round(b*variation.factor));

      const hex=`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      palette.push(hex);
    });

    //add complementary color (opposite cycle of rgb)
    const complementaryR = 255-r;
    const complementaryG = 255-g;
    const complementaryB = 255-b;
    const complementary = `#${complementaryR.toString(16).padStart(2, '0')}${complementaryG.toString(16).padStart(2, '0')}${complementaryB.toString(16).padStart(2, '0')}`; 
     palette.push(complementary);
    setColorPalette(palette);
  }
  
  //copy the clip 
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Color code copied to clipboard",
    });
  };

  const saveNote = () => {
    if (!notepadContent.trim()) return;
    
    const newNote = {
      id: Date.now().toString(),
      title: notepadContent.split('\n')[0].substring(0, 50) || "Untitled Note",
      content: notepadContent,
      date: new Date().toLocaleString()
    };
    
    setSavedNotes(prev => [newNote, ...prev]);
    setNotepadContent("");
    
    toast({
      title: "Note saved!",
      description: "Your note has been saved locally",
    });
  };

  const loadNote = (note) => {
    setNotepadContent(note.content);
  };

  const deleteNote = (id) => {
    setSavedNotes(prev => prev.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Note has been removed",
    });
  };

  const downloadNote = () => {
    const blob = new Blob([notepadContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

    const markdownToHtml = (markdown) => {
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Line breaks
      .replace(/\n/g, '<br>')
      // Lists
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>');
  };

 
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            SaaS Tools Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Useful mini-tools for developers and designers. All tools work offline and don't store data on servers.
          </p>
        </div>
        
        <Tabs defaultValue="colors" className="!w-full">
          <TabsList className="!grid !w-full !grid-cols-3 !mb-8">
            <TabsTrigger value="colors" className="!flex !items-center !gap-2">
              <Palette className="!w-4 !h-4" />
              Color Palette
            </TabsTrigger>
            <TabsTrigger value="notepad" className="!flex !items-center !gap-2">
              <FileText className="!w-4 !h-4" />
              Smart Notepad
            </TabsTrigger>
            <TabsTrigger value="markdown" className="!flex !items-center !gap-2">
              <Eye className="!w-4 !h-4" />
              Markdown Previewer
            </TabsTrigger>
          </TabsList>

          {/* Color Palette Generator */}
          <TabsContent value="colors">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pipette className="w-5 h-5" />
                    Color Palette Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Base Color</label>
                    <div className="flex gap-3">
                      <Input
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="!w-20 !h-12 !p-1 !border !rounded !cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        placeholder="#3b82f6"
                        className="!flex-1"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={generateColorPalette}  className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Palette
                  </Button>

                  <div className="space-y-3">
                    <h3 className="font-medium">How to use:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Pick a base color using the color picker</li>
                      <li>• Click "Generate Palette" to create variations</li>
                      <li>• Click any color to copy its hex code</li>
                      <li>• Use these colors in your design projects</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  {colorPalette?.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {colorPalette?.map((color, index) => (
                        <div
                          key={index}
                          className="group cursor-pointer rounded-lg overflow-hidden border hover:scale-105 transition-transform"
                          onClick={() => copyToClipboard(color)}
                        >
                          <div
                            className="h-16 w-full"
                            style={{ backgroundColor: color }}
                          />
                          <div className="p-3 bg-card">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm">{color}</span>
                              <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Generate a palette to see colors here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Smart Notepad */}
          <TabsContent value="notepad">
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      Smart Notepad
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={downloadNote} variant="outline" size="sm" disabled={!notepadContent}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={saveNote} disabled={!notepadContent.trim()}>
                        Save Note
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={notepadContent}
                    onChange={(e) => setNotepadContent(e.target.value)}
                    placeholder="Start typing your note here... 
                    Features:
                    • Auto-save to local storage
                    • Download as text file
                    • Search through saved notes
                    • No data sent to servers"
                    className=" !min-h-96 !resize-none"
                  />
                  
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <span>{notepadContent.length} characters</span>
                    <span>{notepadContent.split(/\s+/).filter(word => word.length > 0).length} words</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Notes ({savedNotes.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {savedNotes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm line-clamp-1">{note.title}</h4>
                          <Button
                            onClick={() => deleteNote(note.id)}
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 text-destructive"
                          >
                            ×
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{note.date}</p>
                        <Button
                          onClick={() => loadNote(note)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          Load Note
                        </Button>
                      </div>
                    ))}
                    
                    {savedNotes.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No saved notes yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Markdown Previewer */}
          <TabsContent value="markdown">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Markdown Editor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={markdownText}
                    onChange={(e) => setMarkdownText(e.target.value)}
                    placeholder="Type your markdown here..."
                    className="!min-h-96 !font-mono !text-sm !resize-none"
                  />
                  
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="secondary">
                      {markdownText.split('\n').length} lines
                    </Badge>
                    <Button
                      onClick={() => copyToClipboard(markdownText)}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Markdown
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none min-h-96 p-4 border rounded-lg bg-secondary/20"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(markdownText) }}
                  />
                  
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="secondary">
                      Live Preview
                    </Badge>
                    <Button
                      onClick={() => copyToClipboard(markdownToHtml(markdownText))}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy HTML
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Markdown Cheatsheet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Headers</h4>
                      <code className="text-xs bg-secondary/50 p-1 rounded">
                        # H1, ## H2, ### H3
                      </code>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Emphasis</h4>
                      <code className="text-xs bg-secondary/50 p-1 rounded">
                        **bold**, *italic*
                      </code>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Links</h4>
                      <code className="text-xs bg-secondary/50 p-1 rounded">
                        [text](url)
                      </code>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Code</h4>
                      <code className="text-xs bg-secondary/50 p-1 rounded">
                        `inline` or ```block```
                      </code>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Lists</h4>
                      <code className="text-xs bg-secondary/50 p-1 rounded">
                        1. numbered, - bulleted
                      </code>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Quotes</h4>
                       <code className="text-xs bg-secondary/50 p-1 rounded">
                         &gt; blockquote
                       </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
    
    
      </div>
    </div>
  );
}