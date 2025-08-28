-- CreateTable
CREATE TABLE `cliente` (
    `i_cliente_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `s_nome_cliente` VARCHAR(30) NULL,
    `s_cpf_cliente` VARCHAR(11) NOT NULL,
    `d_nasc_cliente` DATETIME(0) NULL,
    `i_tipo_cliente` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `fk_tipocliente`(`i_tipo_cliente`),
    PRIMARY KEY (`i_cliente_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipocliente` (
    `i_tipocliente_tipocliente` INTEGER NOT NULL AUTO_INCREMENT,
    `s_dsctipocliente_tipocliente` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`i_tipocliente_tipocliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venda` (
    `i_venda_venda` INTEGER NOT NULL AUTO_INCREMENT,
    `d_data_venda` DATETIME(0) NULL,
    `f_valor_venda` FLOAT NULL,
    `i_cliente_cliente` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `fk_cliente_venda`(`i_cliente_cliente`),
    PRIMARY KEY (`i_venda_venda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `fk_tipocliente` FOREIGN KEY (`i_tipo_cliente`) REFERENCES `tipocliente`(`i_tipocliente_tipocliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `venda` ADD CONSTRAINT `fk_cliente_venda` FOREIGN KEY (`i_cliente_cliente`) REFERENCES `cliente`(`i_cliente_cliente`) ON DELETE SET NULL ON UPDATE NO ACTION;
