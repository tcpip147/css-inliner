function calculate(text) {
    const score = { A: 0, B: 0, C: 0 };
    const tokens = tokenize(text);
    let n = 0;
    selector();
    if (tokens[n]) {
        throw "unexpected symbol " + tokens[n].value;
    }
    return score;

    function accept(symbol) {
        if (typeof symbol == "string") {
            if (n < tokens.length && tokens[n].type == symbol) {
                if (symbol == "HASH") {
                    score["A"]++;
                }
                n++;
                return true;
            }
        } else if (typeof symbol == "function") {
            let start = n;
            symbol();
            if (start != n) {
                return true;
            }
        }
        return false;
    }

    function selector() {
        accept(simple_selector_sequence);
        while (accept(combinator)) {
            accept(simple_selector_sequence);
        }
    }

    function combinator() {
        if (accept("PLUS")) {
            while (accept("S"));
        } else if (accept("GREATER")) {
            while (accept("S"));
        } else if (accept("TILDE")) {
            while (accept("S"));
        } else if (accept("S")) {
            while (accept("S"));
        }
    }

    function simple_selector_sequence() {
        if (accept(type_selector) || accept(universal)) {
            while (accept("HASH") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation));
        } else if (accept("HASH") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation)) {
            while (accept("HASH") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation));
        }
    }

    function type_selector() {
        let start = n;
        accept(namespace_prefix);
        if (!accept(element_name)) {
            n = start;
        }
        if (start != n) {
            score["C"]++;
        }
    }

    function namespace_prefix() {
        let start = n;
        (accept("IDENT") || accept("ASTERLISK"));
        if (!accept("PIPELINE")) {
            n = start;
        }
    }

    function element_name() {
        accept("IDENT");
    }

    function universal() {
        let start = n;
        accept(namespace_prefix);
        if (!accept("ASTERLISK")) {
            n = start;
        }
    }

    function class_selector() {
        if (accept("DOT")) {
            let start = n;
            accept("IDENT");
            if (start != n) {
                score["B"]++;
            }
        }
    }

    function attrib() {
        let start = n;
        if (accept("LC")) {
            while (accept("S"));
            accept(namespace_prefix);
            if (accept("IDENT")) {
                while (accept("S"));
                if (accept("PREFIXMATCH") || accept("SUFFIXMATCH") || accept("SUBSTRINGMATCH") || accept("EQUAL") || accept("INCLUDES") || accept("DASHMATCH")) {
                    while (accept("S"));
                    if (accept("IDENT") || accept("STRING")) {
                        while (accept("S"));
                    } else {
                        n = start;
                        return;
                    }
                }
                if (accept("RC")) {
                    score["B"]++;
                } else {
                    n = start;
                    return;
                }
            } else {
                n = start;
                return;
            }
        }
    }

    function pseudo() {
        let start = n;
        if (accept("COLON")) {
            const isPseudoElement = accept("COLON");
            if (accept("IDENT") || accept(functional_pseudo)) {
                if (isPseudoElement) {
                    score["C"]++;
                } else {
                    score["B"]++;
                }
            } else {
                n = start;
            }
        }
    }

    function functional_pseudo() {
        if (accept("FUNCTION")) {
            while (accept("S"));
            if (accept(expression)) {
                accept("RCC");
            }
        }
    }

    function expression() {
        if (accept("PLUS") || accept("MINUS") || accept("DIMENSION") || accept("NUMBER") || accept("STRING") || accept("IDENT")) {
            while (accept("S"));
            while (accept("PLUS") || accept("MINUS") || accept("DIMENSION") || accept("NUMBER") || accept("STRING") || accept("IDENT")) {
                while (accept("S"));
            }
        }
    }

    function negation() {
        if (accept("NOT")) {
            while (accept("S"));
            if (accept(negation_arg)) {
                while (accept("S"));
                accept("RCC");
            }
        }
    }

    function negation_arg() {
        accept(type_selector) || accept(universal) || accept("HASH") || accept(class_selector) || accept(attrib) || accept(pseudo);
    }
}

function tokenize(text) {
    const tokens = [];

    const rules = {
        PIPELINE: /^\|/,
        INCLUDES: /^~=/,
        DASHMATCH: /^\|=/,
        PREFIXMATCH: /^\^=/,
        SUFFIXMATCH: /^\$=/,
        SUBSTRINGMATCH: /^\*=/,
        DIMENSION: /^([0-9]+|[0-9]*\.[0-9]+)([-]?([_a-z]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])([_a-z0-9-]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])*)/i,
        ATKEYWORD: /^@([-]?([_a-z]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])([_a-z0-9-]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])*)/i,
        FUNCTION: /^([-]?([_a-z]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])([_a-z0-9-]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])*)\(/i,
        IDENT: /^([-]?([_a-z]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])([_a-z0-9-]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])*)/i,
        STRING: /^((\"([^\n\r\f\\"]|\\{nl}|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])*\")|(\'([^\n\r\f\\']|\\{nl}|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])*\'))/i,
        NUMBER: /^([0-9]+|[0-9]*\.[0-9]+)/,
        HASH: /^#(([_a-z0-9-]|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])+)/i,
        PLUS: /^([ \t\r\n\f]*)\+/,
        GREATER: /^([ \t\r\n\f]*)\>/,
        COMMA: /^([ \t\r\n\f]*)\,/,
        TILDE: /^([ \t\r\n\f]*)\~/,
        NOT: /^:(n|\\0{0,4}(4e|6e)(\r\n|[ \t\r\n\f])?|\\n)(o|\\0{0,4}(4f|6f)(\r\n|[ \t\r\n\f])?|\\o)(t|\\0{0,4}(54|74)(\r\n|[ \t\r\n\f])?|\\t)\(/i,
        INVALID: /^((\"([^\n\r\f\\"]|\\{nl}|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])*)|(\'([^\n\r\f\\']|\\{nl}|[^\0-\177]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?|\\[^\n\r\f0-9a-f])*))/i,
        PERCENTAGE: /^([0-9]+|[0-9]*\.[0-9]+)%/,
        CDO: /^<!--/,
        CDC: /^-->/,
        EQUAL: /^=/,
        ASTERLISK: /^\*/,
        LC: /^\[/,
        RC: /^\]/,
        RCC: /^\)/,
        DOT: /^\./,
        COLON: /^\:/,
        MINUS: /^\-/,
        S: /^[ \t\r\n\f]+/
    };

    let i = 0;
    while (text != "" && i < 100) {
        i++;
        let index = 0;
        for (const type in rules) {
            if (rules[type].test(text)) {
                const match = rules[type].exec(text);
                tokens.push({
                    type: type,
                    value: match[0]
                });
                text = text.substring(match[0].length);
                break;
            }
            index++;
        }
        if (Object.keys(rules).length <= index) {
            console.error("unknown characters \"" + text + "\"");
            text = "";
        }
    }

    return tokens;
}

function compare(a, b) {
    const scoreA = calculate(a);
    const scoreB = calculate(b);
    if (scoreA.A > scoreB.A) {
        return 1;
    } else if (scoreA.A < scoreB.A) {
        return -1;
    } else if (scoreA.A == scoreB.A) {
        if (scoreA.B > scoreB.B) {
            return 1;
        } else if (scoreA.B < scoreB.B) {
            return -1;
        } else if (scoreA.B == scoreB.B) {
            if (scoreA.C > scoreB.C) {
                return 1;
            } else if (scoreA.C < scoreB.C) {
                return -1;
            } else if (scoreA.C == scoreB.C) {
                return 0;
            }
        }
    }
}

export {
    calculate, compare
};