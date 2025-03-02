import { Code, Clipboard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Props {
  unique_key: string;
}

const CodeGuide = ({ unique_key }: Props) => {
  const scriptCode = `<script>
(function () {
  const analyticsServer = "http://localhost:3003/track/${unique_key}";
  const getSessionId = () => {
    const existing = localStorage.getItem("session_id");
    if (existing) return existing;
    const newId = "sess-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("session_id", newId);
    return newId;
  };
  const getDeviceType = () => /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : /Tablet|iPad/i.test(navigator.userAgent) ? "tablet" : "desktop";
  const sendAnalyticsData = () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    const data = {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      loadTime: loadTime > 0 ? loadTime : 0,
      session_id: getSessionId(),
      deviceType: getDeviceType()
    };
    navigator.sendBeacon(analyticsServer, JSON.stringify(data));
  };
  window.addEventListener("load", sendAnalyticsData);
})();
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode);
    toast.success("Code copied to clipboard!");
  };

  // Manually style keywords, function names, variables, and brackets
  const highlightedCode = `
<span style="color:#e06c75;">&lt;script&gt;</span><br>
<span style="color:#c678dd;">(</span><span style="color:#61afef;">function</span> <span style="color:#c678dd;">()</span> <span style="color:#c678dd;">{</span></span><br>
<span style="color:#56b6c2;">  const</span> <span style="color:#e5c07b;">analyticsServer</span> = "http://localhost:3003/track/${unique_key}";<br>
<span style="color:#56b6c2;">  const</span> <span style="color:#e5c07b;">getSessionId</span> = <span style="color:#c678dd;">()</span> <span style="color:#c678dd;">=> {</span><br>
<span style="color:#56b6c2;">    const</span> <span style="color:#e5c07b;">existing</span> = localStorage.getItem("session_id");<br>
<span style="color:#56b6c2;">    if</span> <span style="color:#c678dd;">(</span>existing<span style="color:#c678dd;">)</span> <span style="color:#56b6c2;">return</span> existing;<br>
<span style="color:#56b6c2;">    const</span> <span style="color:#e5c07b;">newId</span> = "sess-" + Math.random().toString(36).substr(2, 9);<br>
<span style="color:#e5c07b;">    localStorage.setItem</span>("session_id", newId);<br>
<span style="color:#56b6c2;">    return</span> newId;<br>
<span style="color:#c678dd;">  };</span><br>
<span style="color:#56b6c2;">  const</span> <span style="color:#e5c07b;">getDeviceType</span> = <span style="color:#c678dd;">()</span> <span style="color:#c678dd;">=> /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : /Tablet|iPad/i.test(navigator.userAgent) ? "tablet" : "desktop";</span><br>
<span style="color:#56b6c2;">  const</span> <span style="color:#e5c07b;">sendAnalyticsData</span> = <span style="color:#c678dd;">()</span> <span style="color:#c678dd;">=> {</span><br>
<span style="color:#56b6c2;">    const</span> <span style="color:#e5c07b;">loadTime</span> = performance.timing.loadEventEnd - performance.timing.navigationStart;<br>
<span style="color:#56b6c2;">    const</span> <span style="color:#e5c07b;">data</span> = <span style="color:#c678dd;">{</span><br>
<span style="color:#e5c07b;">      url</span>: window.location.href,<br>
<span style="color:#e5c07b;">      referrer</span>: document.referrer,<br>
<span style="color:#e5c07b;">      userAgent</span>: navigator.userAgent,<br>
<span style="color:#e5c07b;">      timestamp</span>: Date.now(),<br>
<span style="color:#e5c07b;">      loadTime</span>: loadTime > 0 ? loadTime : 0,<br>
<span style="color:#e5c07b;">      session_id</span>: getSessionId(),<br>
<span style="color:#e5c07b;">      deviceType</span>: getDeviceType()<br>
<span style="color:#c678dd;">    };</span><br>
<span style="color:#e5c07b;">    navigator.sendBeacon</span>(analyticsServer, JSON.stringify(data));<br>
<span style="color:#c678dd;">  };</span><br>
<span style="color:#e5c07b;">  window.addEventListener</span>("load", sendAnalyticsData);<br>
<span style="color:#c678dd;">})();</span><br>
<span style="color:#e06c75;">&lt;/script&gt;</span>
`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Code />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-fit ">
              <DialogHeader>
                <DialogTitle>
                  Integration Code
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="right-4 text-gray-300 hover:text-white"
                  >
                    <Clipboard size={18} />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="bg-gray-900 rounded-md overflow-auto">
                <pre 
                  className="font-mono text-sm leading-2.5"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Embedding code you need for your website.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CodeGuide;
