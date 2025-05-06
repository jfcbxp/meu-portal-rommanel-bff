SELECT
  E2_CATEGFO,
  E2_FORNECE,
  E2_NOMFOR,
  E2_SALDO AS E2_VALOR,
  CASE
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0201'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0131' THEN 'JANEIRO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0201'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0231' THEN 'FEVEREIRO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0301'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0331' THEN 'MARÇO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0401'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0431' THEN 'ABRIL'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0501'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0531' THEN 'MAIO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0601'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0631' THEN 'JUNHO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0701'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0731' THEN 'JULHO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0801'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0831' THEN 'AGOSTO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0901'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0931' THEN 'SETEMBRO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1001'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1031' THEN 'OUTUBRO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1101'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1131' THEN 'NOVEMBRO'
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1201'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1231' THEN 'DEZEMBRO'
  END AS MES,
  CASE
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0201'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0131' THEN 1
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0201'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0231' THEN 2
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0301'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0331' THEN 3
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0401'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0431' THEN 4
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0501'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0531' THEN 5
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0601'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0631' THEN 6
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0701'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0731' THEN 7
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0801'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0831' THEN 8
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0901'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '0931' THEN 9
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1001'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1031' THEN 10
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1101'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1131' THEN 11
    WHEN E2_VENCREA >= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1201'
    AND E2_VENCREA <= SUBSTRING(
      E2_VENCREA
      FROM
        1 FOR 4
    ) + '1231' THEN 12
  END AS NUMERO,
  E2_VENCREA,
  E2_VENCTO
FROM
  dbo.SE2020
WHERE
  (D_E_L_E_T_ <> '*')
  AND (E2_SALDO > 0)
  AND (E2_DOCSILU NOT LIKE '%RENEGOCIADO%');