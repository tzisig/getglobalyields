import re, sys

def parse(file):
    rules = []
    for line in open(file):
        line=line.strip()
        if not line or line.startswith("#"): continue
        p=re.split(r"\s+",line)
        if len(p)>=2: rules.append((p[0],p[1]))
    return rules

def match(p, s):
    return p.startswith(s[:-1]) if s.endswith("*") else p.rstrip("/") == s.rstrip("/")

def resolve(p, rules, seen=None):
    seen = seen or []
    for s,t in rules:
        if match(p,s):
            if p in seen: return seen+[p]
            return resolve(t,rules,seen+[p])
    return seen+[p]

def main():
    f = sys.argv[1] if len(sys.argv)>1 else "_redirects"
    r = parse(f)
    bad=False

    for s,_ in r:
        p=s.replace("*","")
        chain=resolve(p,r)
        if len(chain)>2:
            bad=True
            print("::error::"+" → ".join(chain))

    sys.exit(1 if bad else 0)

if __name__=="__main__":
    main()