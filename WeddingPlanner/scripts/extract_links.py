import json, sys
src = "/Users/chadheller/EnterpriseAssistant/Chad + Eric Wedding Planner.xlsx"
try:
    import openpyxl
except ImportError:
    print("NO_OPENPYXL")
    sys.exit(0)
wb = openpyxl.load_workbook(src, data_only=True)
out = {}
for ws in wb.worksheets:
    links = []
    for row in ws.iter_rows():
        for cell in row:
            if cell.hyperlink and cell.hyperlink.target:
                val = str(cell.value).strip() if cell.value is not None else None
                links.append({"cell": cell.coordinate, "value": val, "url": cell.hyperlink.target})
    if links:
        out[ws.title] = links
print("SHEETS_WITH_LINKS:", list(out.keys()))
for sheet, links in out.items():
    print("\n=== %s (%d links) ===" % (sheet, len(links)))
    for l in links:
        print("%s | %s | %s" % (l["cell"], l["value"], l["url"]))
