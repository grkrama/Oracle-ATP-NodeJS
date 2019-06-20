create or replace PROCEDURE "ZEB_ORDERNUM_GENENATION" (ORDERTYPE IN VARCHAR2,OUTPARM OUT VARCHAR2) IS
 vORDER_NUM           VARCHAR2(30)      := '0';
BEGIN
   IF ORDERTYPE = 'TYPE1' then
       select ZEB_ORDERNUM_GEN_EMEA.NEXTVAL into vORDER_NUM from dual;
       OUTPARM  := vORDER_NUM;
       dbms_output.put_line(OUTPARM);
    END IF;
   IF ORDERTYPE = 'TYPE2' then
       select ZEB_ORDERNUM_GEN_NA.NEXTVAL into vORDER_NUM from dual;
       OUTPARM  := vORDER_NUM;
       dbms_output.put_line(OUTPARM);
    END IF;
END ZEB_ORDERNUM_GENENATION;