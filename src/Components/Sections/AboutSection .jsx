import { useState } from "react";
import { LevelSection } from "../LevelSection";
import { Button } from "../Ui/Button";
import { Card, CardContent } from "../Ui/Card";
import { Badge } from "../Ui/Badge";
import { User, Code, Zap, Star, Calendar, MapPin } from "lucide-react";

export const AboutSection = ({ isUnlocked, onUnlock }) => {
  const [selectedYear, setSelectedYear] = useState(2024);
  
  const timelineData = [
    { year: 2020, title: "Started Coding Journey", desc: "Discovered programming with Python", tech: ["Python", "HTML", "CSS"] },
    { year: 2021, title: "Web Development", desc: "Built first full-stack applications", tech: ["JavaScript", "React", "Node.js"] },
    { year: 2022, title: "Advanced Frameworks", desc: "Mastered modern web technologies", tech: ["TypeScript", "Next.js", "MongoDB"] },
    { year: 2023, title: "Professional Experience", desc: "Joined tech industry as developer", tech: ["React", "AWS", "Docker"] },
    { year: 2024, title: "Full-Stack Mastery", desc: "Leading projects and mentoring", tech: ["AI/ML", "Cloud", "DevOps"] },
  ];

  const skills = [
    { name: "React/Next.js", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Language" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 88, category: "Language" },
    { name: "AWS/Cloud", level: 80, category: "DevOps" },
    { name: "MongoDB", level: 85, category: "Database" },
  ];

  return (
    <LevelSection
      level={1}
      title="About Me"
      icon="👤"
      isUnlocked={isUnlocked}
      isCompleted={false}
      onUnlock={onUnlock}
      className="mb-8"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Info */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Personal Info</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-primary/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">Location</span>
                </div>
                <p className="text-muted-foreground">India 🇮🇳</p>
              </div>

              <div className="bg-gradient-cyber/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-electric-blue" />
                  <span className="font-medium">Coding Since</span>
                </div>
                <p className="text-muted-foreground">2020 (4+ years)</p>
              </div>

              <div className="bg-gradient-success/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-cyber-green" />
                  <span className="font-medium">Specialization</span>
                </div>
                <p className="text-muted-foreground">Full-Stack Development</p>
              </div>
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              Passionate full-stack developer with expertise in modern web technologies. 
              I love creating interactive, user-friendly applications and solving complex problems 
              with clean, efficient code.
            </p>
          </CardContent>
        </Card>

        {/* Skills Overview */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Skills & Expertise</h3>
            </div>
            
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Machine Slider */}
      <Card className="border-primary/20 mt-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Journey Timeline - Time Machine 🕰️</h3>
          </div>
          
          <div className="space-y-6">
            {/* Year Slider */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>2020</span>
                <span>Present</span>
              </div>
              <input
                type="range"
                min="2020"
                max="2024"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full h-2 bg-gradient-primary rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">{selectedYear}</span>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="bg-card/50 border border-primary/20 rounded-lg p-6 min-h-32">
              {timelineData
                .filter(item => item.year === selectedYear)
                .map((item, index) => (
                  <div key={index} className="space-y-4 animate-fade-in-up">
                    <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-primary/10 text-primary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Year Buttons */}
            <div className="grid grid-cols-5 gap-2">
              {timelineData.map((item) => (
                <Button
                  key={item.year}
                  variant={selectedYear === item.year ? "gaming" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedYear(item.year)}
                  className="text-xs"
                >
                  {item.year}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </LevelSection>
  );
};
