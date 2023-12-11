WITH
  numbers_only AS (
    SELECT
      regexp_replace(
        regexp_split_to_table(pg_read_file('input'), E'\n'),
        '[^0-9]',
        '',
        'g'
      ) AS complete_number
  ),
  calibration_values AS (
    SELECT
      left(complete_number, 1) || right(complete_number, 1) AS calibration_value
    FROM
      numbers_only
    WHERE
      complete_number <> ''
  )
SELECT
  sum(calibration_value::integer)
FROM
  calibration_values;
