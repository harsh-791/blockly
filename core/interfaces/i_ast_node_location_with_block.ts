/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The interface for an AST node location that has an associated
 * block.
 */

/**
 * The interface for an AST node location that has an associated
 * block.
 * @namespace Blockly.IASTNodeLocationWithBlock
 */


/* eslint-disable-next-line no-unused-vars */


import type {IASTNodeLocation} from './i_ast_node_location';


/**
 * An AST node location that has an associated block.
 * @alias Blockly.IASTNodeLocationWithBlock
 */
export interface IASTNodeLocationWithBlock extends IASTNodeLocation {
  /**
   * Get the source block associated with this node.
   * @return The source block.
   */
  getSourceBlock: AnyDuringMigration;
}