import { MessageCircle, Minimize2, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import type { ChatMessage } from "../../types";

interface ChatBotWidgetProps {
  chatOpen: boolean;
  setChatOpen: (value: boolean) => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (value: string) => void;
  handleSendMessage: () => void;
}

export function ChatBotWidget({ chatOpen, setChatOpen, chatMessages, chatInput, setChatInput, handleSendMessage }: ChatBotWidgetProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {chatOpen ? (
        <Card className="w-80 sm:w-96 h-[480px] flex flex-col shadow-2xl border-primary/20">
          <CardHeader className="bg-primary text-primary-foreground flex flex-row items-center justify-between py-3 px-4 rounded-t-lg">
            <div className="flex items-center gap-2"><MessageCircle className="w-5 h-5" /><CardTitle className="text-base">Hỗ Trợ Trực Tuyến</CardTitle></div>
            <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setChatOpen(false)}>
              <Minimize2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm ${msg.isUser ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="p-3 border-t border-border">
            <div className="flex gap-2 w-full">
              <Input placeholder="Nhập tin nhắn..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} className="flex-1" />
              <Button size="icon" onClick={handleSendMessage} className="shrink-0"><Send className="w-4 h-4" /></Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform" onClick={() => setChatOpen(true)}>
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
