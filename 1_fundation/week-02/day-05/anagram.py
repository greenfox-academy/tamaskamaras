
def anagram (a, b):
    text1 = sorted(a)
    text2 = sorted(b)
    if text1 == text2:
        output = True
    else:
        output = False
    return output

print(anagram(str(input("Type a word: ")), str(input("Type an anagram: "))))
