#Include 'protheus.ch'
#Include 'FWMVCDEF.ch'
#Include "RestFul.CH"
#include "tbiconn.ch"
#INCLUDE 'totvs.ch'
#INCLUDE "restful.ch"
WSRESTFUL APIMPR DESCRIPTION "servico REST Meu Portal Rommanel" FORMAT APPLICATION_JSON

 WSDATA filial AS STRING OPTIONAL
 WSDATA titulo AS STRING OPTIONAL
 WSDATA parcela AS STRING OPTIONAL
 WSDATA prefixo AS STRING OPTIONAL
 WSDATA tipo AS STRING OPTIONAL

//WSMETHOD GET MYONE PATHPARAM id HEADERPARAM cMyHeader WSSERVICE samplenew
//WSMETHOD GET GETCHECKOUT QUERYPARAM filial,titulo,parcela,prefixo,tipo DESCRIPTION "Obtem o checkout corrente" PATH "/v1/checkout" TTALK "v1" PRODUCES APPLICATION_JSON
WSMETHOD POST CHECKOUT DESCRIPTION "Cria um checkout" PATH "/v1/checkout" TTALK "v1" PRODUCES APPLICATION_JSON

END WSRESTFUL

WSMETHOD POST GETCHECKOUT WSSERVICE APIMPR
	aArea		:= GetArea()
	cBody := ::GetContent()
	oJson := JsonObject():New()
	oJsonCli := JsonObject():New() 
	ret := oJson:FromJson(cBody)
	::SetContentType("application/json")

	filial  := PadR(FWNoAccent(ALLTRIM(oJson['filial'])),TamSX3("E1_FILIAL")[1])
	prefixo := PadR(FWNoAccent(ALLTRIM(oJson['prefixo'])),TamSX3("E1_PREFIXO")[1])
	titulo  := PadR(FWNoAccent(ALLTRIM(oJson['titulo'])),TamSX3("E1_NUM")[1])
	parcela := PadR(FWNoAccent(ALLTRIM(oJson['parcela'])),TamSX3("E1_PARCELA")[1])
	tipo 	:= PadR(FWNoAccent(ALLTRIM(oJson['tipo'])),TamSX3("E1_TIPO")[1])

		nSaldo := 0
		dbSelectArea('SE1')
		dbsetorder(1)

		If dbSeek(filial+prefixo+titulo+parcela+tipo)
			nSaldo := SaldoTit(SE1->E1_PREFIXO,SE1->E1_NUM,SE1->E1_PARCELA,SE1->E1_TIPO,SE1->E1_NATUREZ,"R",SE1->E1_FORNECE,1,,,SE1->E1_LOJA,,0/*nTxMoeda*/)
			oJsonCli['saldo'] := nSaldo
			::SetResponse(oJsonCli:toJSON())
		ENDIF

	FreeObj(oJson)

	RestArea(aArea)
Return(.T.)

/*
WSMETHOD GET GETCHECKOUT WSRECEIVE filial,titulo,parcela WSSERVICE APIMPR
	Default self:filial := ''
	Default self:titulo := ''
	Default self:parcela := '' 
	Default self:prefixo := '' 
	Default self:tipo := '' 

	aArea		:= GetArea()
	//cBody := ::GetContent()
	oJson := JsonObject():New()
	//ret := oJson:FromJson(cBody)
  	oJsonCli := JsonObject():New() 

	::SetContentType("application/json")

	IF !EMPTY(self:filial) .AND. !EMPTY(self:titulo) .AND.  !EMPTY(self:parcela)
		nSaldo := 0

		dbSelectArea('SE1')
		dbsetorder(1)
		dbSeek(self:filial+self:titulo+self:parcela,.f.)
		nSaldo := SaldoTit(SE1->E1_PREFIXO,SE1->E1_NUM,SE1->E1_PARCELA,SE1->E1_TIPO,SE1->E1_NATUREZ,"R",SE1->E1_FORNECE,1,,,SE1->E1_LOJA,,0/*nTxMoeda*/)
		oJsonCli['saldo'] := nSaldo
		::SetResponse(oJsonCli:toJSON())
	ENDIF
	
	FreeObj(oJson)

	RestArea(aArea)
Return(.F.)
*/