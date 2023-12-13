CREATE TABLE IF NOT EXISTS conversions
(
    word   text,
    number text
);

DELETE
FROM conversions;
INSERT INTO conversions (word, number)
VALUES ('one', '1'),
       ('two', '2'),
       ('three', '3'),
       ('four', '4'),
       ('five', '5'),
       ('six', '6'),
       ('seven', '7'),
       ('eight', '8'),
       ('nine', '9'),
       ('1', '1'),
       ('2', '2'),
       ('3', '3'),
       ('4', '4'),
       ('5', '5'),
       ('6', '6'),
       ('7', '7'),
       ('8', '8'),
       ('9', '9')
;

CREATE TABLE IF NOT EXISTS lines
(
    line text
);
DELETE
FROM lines;
INSERT INTO lines (line)
SELECT regexp_split_to_table(pg_read_file('input'), E'\n') as line;

CREATE TABLE IF NOT EXISTS word_locations
(
    first_index int,
    last_index  int,
    word        text,
    number      text,
    line        text
);
DELETE
FROM word_locations;
INSERT INTO word_locations (first_index, last_index, word, number, line)
SELECT strpos(line, word) as first_index,
       (length(line) - (strpos(reverse(line), reverse(word)) + length(word) - 1) +
        1)                as last_index,
       word,
       number,
       line
FROM conversions,
     lines
WHERE line <> ''
  AND strpos(line, word) > 0;

CREATE TABLE IF NOT EXISTS extracted
(
    min  int,
    max  int,
    line text
);
DELETE
FROM extracted;

INSERT INTO extracted (min, max, line)
SELECT min(first_index), max(last_index), line
FROM word_locations
GROUP BY line;

DROP TABLE IF EXISTS min;
CREATE TABLE IF NOT EXISTS min
(
    word   text,
    number text,
    index  integer,
    line   text
);
DELETE
FROM min;

INSERT INTO min (word, number, index, line)
SELECT word_locations.word, word_locations.number, extracted.min, extracted.line as line
FROM extracted,
     word_locations
WHERE extracted.min = word_locations.first_index
  AND extracted.line = word_locations.line
ORDER BY line;

DROP TABLE IF EXISTS max;

CREATE TABLE IF NOT EXISTS max
(
    word   text,
    number text,
    index  integer,
    line   text
);

DELETE
FROM max;

INSERT INTO max (word, number, index, line)
SELECT word_locations.word, word_locations.number, extracted.max, extracted.line as line
FROM extracted,
     word_locations
WHERE extracted.max = word_locations.last_index
  AND extracted.line = word_locations.line
ORDER BY line;

WITH two_digits AS (SELECT max.line, min.number, max.number, min.number || max.number as two_digit_number
                    FROM min
                             INNER JOIN
                         max
                         ON min.line = max.line)
SELECT sum(two_digit_number::integer) as sum
FROM two_digits;