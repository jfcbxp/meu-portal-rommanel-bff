CREATE VIEW USUARIOS_MEU_PORTAL_ROMMANEL AS
SELECT R_E_C_N_O_ AS REC,LTRIM(TRIM(A1_COD)) AS CODIGO,LTRIM(TRIM(A1_CGC)) AS CGC,
LTRIM(TRIM(A1_NOME)) AS NOME,LTRIM(TRIM(A1_EMAIL)) AS EMAIL,CAST(A1_DTNASC AS DATE) AS NASCIMENTO 
FROM SA1010 (NOLOCK) WHERE D_E_L_E_T_ = ''