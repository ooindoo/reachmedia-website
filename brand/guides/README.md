# Guide PDF

Sorgenti HTML delle risorse scaricabili (stesso design del sito).
Le versioni pubblicate stanno in `public/` con i nomi storici, così i link
già in circolazione (sito, quiz, email Klaviyo) restano validi.

| Sorgente | Pubblicato come |
| --- | --- |
| `guida-zero.html` | `public/rm_guida_zero.pdf` |
| `checklist.html` | `public/rm_checklist.pdf` (+ copie `checklist.pdf`, `checklist-reachmedia.pdf`) |
| `flow-avanzati.html` | `public/rm_flow_avanzati.pdf` |

Rigenerare (Chrome headless, serve rete per i font Geist):

```bash
cd brand/guides
for f in guida-zero checklist flow-avanzati; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
    --no-pdf-header-footer --virtual-time-budget=8000 \
    --print-to-pdf="$PWD/$f.pdf" "file://$PWD/$f.html"
done
```
