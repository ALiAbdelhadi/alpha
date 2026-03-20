import json

def get_keys(data, prefix=''):
    keys = set()
    if isinstance(data, dict):
        for k, v in data.items():
            new_key = f"{prefix}.{k}" if prefix else k
            keys.add(new_key)
            keys.update(get_keys(v, new_key))
    elif isinstance(data, list):
        for i, v in enumerate(data):
            new_key = f"{prefix}[{i}]"
            keys.add(new_key)
            keys.update(get_keys(v, new_key))
    return keys

with open(r'c:\Users\aliab\altruvex\apps\www\messages\en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

with open(r'c:\Users\aliab\altruvex\apps\www\messages\ar.json', 'r', encoding='utf-8') as f:
    ar = json.load(f)

en_keys = get_keys(en)
ar_keys = get_keys(ar)

missing_in_ar = en_keys - ar_keys
missing_in_en = ar_keys - en_keys

print(f"Missing in ar.json ({len(missing_in_ar)}):")
for k in sorted(missing_in_ar):
    print(f"  - {k}")

print(f"\nMissing in en.json ({len(missing_in_en)}):")
for k in sorted(missing_in_en):
    print(f"  - {k}")
