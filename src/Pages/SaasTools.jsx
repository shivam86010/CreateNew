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

export default function SaasTools() {
    const [colorPalette, setColorPalette] = useState([]);
    const [baseColor, setBaseColor] = useState("#3b82f6");
 
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
        
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Color Palette
            </TabsTrigger>
            <TabsTrigger value="notepad" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Smart Notepad
            </TabsTrigger>
            <TabsTrigger value="markdown" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
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
                        className="w-20 h-12 p-1 border rounded cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        placeholder="#3b82f6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <Button  className="w-full">
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
                  {/* {colorPalette.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {colorPalette.map((color, index) => (
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
                  )} */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
    
    
      </div>
    </div>
  );
}